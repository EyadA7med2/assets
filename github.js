const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Octokit } = require("@octokit/rest");

const owner = "EyadA7med2";
const repo = "assets";
const folderPath = "";
const githubToken = "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";

const octokit = new Octokit({
  auth: githubToken,
});

async function deleteExistingFiles() {
  try {
    const response = await octokit.repos.getContents({
      owner,
      repo,
      path: folderPath,
    });

    if (response.status === 200) {
      const existingFiles = response.data;

      // Delete existing files
      for (const file of existingFiles) {
        await octokit.repos.deleteFile({
          owner,
          repo,
          path: file.path,
          message: `Delete ${file.name}`,
          sha: file.sha,
        });

        console.log(`File ${file.name} deleted successfully.`);
      }
    } else {
      console.error(`Error getting file list. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting existing files.", error.message);
  }
}

async function uploadImage(filePath, fileName) {
  try {
    const fileContent = fs.readFileSync(filePath, { encoding: "base64" });
    const content = fileContent.toString("base64");

    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: path.join(folderPath, fileName),
      message: `Add ${fileName}`,
      content,
    });

    if (response.status === 200 || response.status === 201) {
      console.log(`File ${fileName} uploaded successfully.`);
      return true;
    } else {
      console.error(
        `Error uploading ${fileName}. Status code: ${response.status}`
      );
      return false;
    }
  } catch (error) {
    console.error(`Error uploading ${fileName}.`, error.message);
    return false;
  }
}

async function getDirectLinks() {
  try {
    const response = await octokit.repos.getContents({
      owner,
      repo,
      path: folderPath,
    });

    if (response.status === 200) {
      const directLinks = response.data.map((file) => file.download_url);
      return directLinks;
    } else {
      console.error(`Error getting file list. Status code: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Error getting file list.", error.message);
    return [];
  }
}

async function saveLinksToFile(links) {
  const filePath = path.join(__dirname, "direct_links.json");

  try {
    await fs.promises.writeFile(filePath, JSON.stringify(links, null, 2));
    console.log(`Direct links saved to ${filePath}`);
  } catch (error) {
    console.error("Error saving direct links to file.", error.message);
  }
}

async function main() {
  // Delete existing files
  await deleteExistingFiles();

  // Upload new images
  const imageFolder = path.join(__dirname, folderPath);
  const fileList = fs.readdirSync(imageFolder);

  for (const fileName of fileList) {
    const filePath = path.join(imageFolder, fileName);
    await uploadImage(filePath, fileName);
  }

  // Get and log direct links
  const directLinks = await getDirectLinks();
  console.log("Direct Links Array:", directLinks);

  // Save the links to a JSON file
  await saveLinksToFile(directLinks);
}

main();
