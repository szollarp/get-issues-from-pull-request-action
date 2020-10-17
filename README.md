# Action collect issue ids from pull request

[![actions-workflow-test][actions-workflow-test-badge]][actions-workflow-test]
[![release][release-badge]][release]

It's a GitHub Action to collect issue ids from pull request.
(from pull request issue ref, description and from the commit logs)

## Inputs

|      NAME      |                                           DESCRIPTION                                           |   TYPE   | REQUIRED |                                     DEFAULT                                     |
| -------------- | ----------------------------------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------- |
| `token` | A GitHub token.                                                                                 | `string` | `true`   | `N/A`                                            | `number` | `true`  | `N/A`
| `pull_request_id` | A pull request id.                                                                                 | `string` | `true`   | `N/A`                                            | `number` | `true`  | `N/A`

## Example

### Get issue ids from a pull requests

```yaml
jobs: 
  get-ids:
    runs-on: ubuntu-latest
    steps:      
      - name: Get issues
        id: get-issues
        uses: szollarp/get-issues-from-pull-request-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          pull_request_id: 1
      - name: Echo ids
        run: echo "ids ${{ steps.get-issues.outputs.ids }}"
```

<!-- badge links -->

[actions-workflow-test]: https://github.com/szollarp/get-issues-from-pull-request-action/actions?query=workflow%3Aunits-test
[actions-workflow-test-badge]: https://img.shields.io/github/workflow/status/szollarp/get-issues-from-pull-request-action/units-test?label=Test&style=for-the-badge&logo=github

[release]: https://github.com/szollarp/get-issues-from-pull-request-action/releases
[release-badge]: https://img.shields.io/github/v/release/szollarp/get-issues-from-pull-request-action?style=for-the-badge&logo=github
