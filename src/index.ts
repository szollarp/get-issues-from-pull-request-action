import * as core from "@actions/core";
import * as github from "@actions/github";
import {
    getIssueFromIssueUrl,
    getIssueFromBody,
    getIssueFromCommits,
} from "./utils";

const run = async (): Promise<void> => {
    try {
        const token = core.getInput("token", { required: true });
        const pullRequestId = Number(
            core.getInput("pull_request_id", { required: true })
        );

        const { context, getOctokit } = github;
        const octokit = getOctokit(token);

        const merged = await octokit.pulls.checkIfMerged({
            ...context.repo,
            pull_number: pullRequestId,
        });
        if (!merged || !merged.data.merged) {
            core.setOutput("ids", null);
        }

        const pullRequestResponse = await octokit.pulls.get({
            ...context.repo,
            pull_number: pullRequestId,
        });
        if (!pullRequestResponse || !pullRequestResponse.data) {
            core.setOutput("ids", null);
        }

        const { data: pullRequest } = pullRequestResponse;
        const issueFromUrl = getIssueFromIssueUrl(pullRequest);
        const issuesFromBody = getIssueFromBody(pullRequest);

        const commitsResponse = await octokit.pulls.listCommits({
            ...context.repo,
            pull_number: pullRequestId,
        });

        const issuesFromCommits = getIssueFromCommits(commitsResponse.data);
        const issues = [issueFromUrl, ...issuesFromBody, ...issuesFromCommits];
        core.setOutput("ids", issues);
    } catch (error) {
        core.error(error);
        core.setFailed(error.message);
    }
};

run();
