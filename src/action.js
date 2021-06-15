const core = require('@actions/core');
const github = require('@actions/github');

async function run()
{
	try
	{
	const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
	console.log("my token" + GITHUB_TOKEN);
	const octokit          = github.getOctokit(GITHUB_TOKEN);
	const { context = {} } = github;
	const { pull_request } = context.payload;
	const allMyLabels      = pull_request.labels;
	const label         = [];

	console.log("PR number is: " + github.context.payload.pull_request.number);
	console.log("Select first label name from PR to remove: " + allMyLabels[0].name);
	await octokit.rest.issues.removeLabel({
		...context.repo,
		issue_number: pull_request.number,
		name: allMyLabels[0].name
	});
	console.log("Removed first label OK");

	console.log(`Add this label ${allMyLabels[0].name}`)
	label.push(allMyLabels[0].name);
	await octokit.rest.issues.addLabels({
		...context.repo,
		issue_number: pull_request.number,
		labels: label
	});
	console.log("Added label OK");
/*

		const readable_Labels = JSON.stringify(allMyLabels,undefined,2);
	//	console.log("Print all labels: " + readable_Labels);
	const first_Label = JSON.stringify(allMyLabels[0],undefined,2);
	console.log("Print first label: " + first_Label);

	await octokit.rest.issues.createComment({
		...context.repo,
		issue_number: pull_request.number,
		body: '3Thank you for submitting a pull request! We will try to review this as soon as we can.'
	});

	await octokit.rest.issues.addLabels({
		owner: pr_owner,
		repo: pr_repo,
		issue_number: pull_request.number,
		labels: `bug`,
	});
	console.log("set label OK");
*/
	console.log("Hello, world!");
	} catch(error)
	{
		core.setFailed(error.message);
	}
}




run();