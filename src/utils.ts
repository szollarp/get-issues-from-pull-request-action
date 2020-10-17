import {
    PullsGetResponseData,
    PullsListCommitsResponseData,
} from "@octokit/types";

export const getIssueFromIssueUrl = (
    pullRequest: PullsGetResponseData | null
): null | string => {
    if (!pullRequest || !pullRequest.issue_url) return null;
    return pullRequest.issue_url.split("/").pop() || null;
};

export const getIssueFromBody = (
    pullRequest: PullsGetResponseData | null
): string[] => {
    if (!pullRequest || !pullRequest.body) return [];
    const issues = pullRequest.body.match(/#(\d+)/gim);
    if (!issues) return [];
    return issues.map((issue: string): string => issue.replace("#", ""));
};

export const getIssueFromCommits = (
    commits: PullsListCommitsResponseData | null
): string[] => {
    if (!commits) return [];
    const messages = commits
        .map((commit): string => commit.commit.message)
        .filter((_): string => _);
    if (!messages) return [];

    let issues: string[] = [];
    messages.map((message): void => {
        const matched = message.match(/#(\d+)/gim) || [];
        issues = [
            ...issues,
            ...matched.map((issue): string => issue.replace("#", "")),
        ];
    });

    return issues;
};
