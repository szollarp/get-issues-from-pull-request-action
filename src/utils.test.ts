import {
    PullsGetResponseData,
    PullsListCommitsResponseData,
} from "@octokit/types";
import {
    getIssueFromIssueUrl,
    getIssueFromBody,
    getIssueFromCommits,
} from "./utils";

describe("test getIssueFromIssueUrl util function", (): void => {
    it("should return null", async (): Promise<void> => {
        const response = getIssueFromIssueUrl(null);
        expect(response).toBe(null);
    });

    it("should return issue id", async (): Promise<void> => {
        const data = {
            issue_url: "https://api.github.com/repos/owner/repository/issues/1347",
        };

        const response = getIssueFromIssueUrl(data as PullsGetResponseData);
        expect(response).toBe("1347");
    });
});

describe("test getIssueFromBody util function", (): void => {
    it("should return empty array", async (): Promise<void> => {
        const response = getIssueFromBody(null);
        expect(response).toStrictEqual([]);
    });

    it("should return empty array without issue on body", async (): Promise<
    void
    > => {
        const data = {
            body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      `,
        };

        const response = getIssueFromBody(data as PullsGetResponseData);
        expect(response).toStrictEqual([]);
    });

    it("should return issue id", async (): Promise<void> => {
        const data = {
            body: `
        #1 #2 Lorem ipsum dolor sit amet, consectetur #3 adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut #4enim ad minim veniam, quis nostrud #55exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat #9.
      `,
        };

        const response = getIssueFromBody(data as PullsGetResponseData);
        expect(response).toStrictEqual(["1", "2", "3", "4", "55", "9"]);
    });
});

describe("test getIssueFromCommits util function", (): void => {
    it("should return empty array", async (): Promise<void> => {
        const response = getIssueFromCommits(null);
        expect(response).toStrictEqual([]);
    });

    it("should return empty array without issue code on message", async (): Promise<
    void
    > => {
        const data = [
            { commit: {} },
            { commit: {} },
            { commit: { message: "message" } },
        ];

        const response = getIssueFromCommits(data as PullsListCommitsResponseData);
        expect(response).toStrictEqual([]);
    });

    it("should return issue id", async (): Promise<void> => {
        const data = [
            {
                commit: {
                    message:
            "#1 Lorem ipsum dolor sit amet, consectetur #3 adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                },
            },
            {
                commit: {
                    message:
            "Ut #4enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                },
            },
        ];

        const response = getIssueFromCommits(data as PullsListCommitsResponseData);
        expect(response).toStrictEqual(["1", "3", "4"]);
    });
});
