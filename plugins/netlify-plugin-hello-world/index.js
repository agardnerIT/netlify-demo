// https://docs.netlify.com/integrations/build-plugins/create-plugins

/*
module.exports = {
  onPreBuild: ({ constants, netlifyConfig, packageJson}) => {
    console.log("Hello world from onPreBuild event!");
    //console.log('---------------');
    //console.log('Printing constants');
    //console.log(constants);
    console.log('---------------');
    console.log('Printing netlifyConfig');
    console.log(netlifyConfig);
    console.log('---------------');
    console.log('Printing packageJson')
    console.log(packageJson);
    console.log('---------------');
  },
}
*/

const { env } = require('process')

var fs = require('fs');


module.exports = {
  onPostBuild: ({ constants, netlifyConfig, utils}) => {

    console.log("Hello world from onPostBuild event!");

    let baseUrl = process.env.DEPLOY_PRIME_URL; // Netlify deploy preview or base URL
  
    let dt_url = process.env.dt_environment_url; // https://abc12345.live.dynatrace.com
    let dt_api_token = process.env.dt_api_token; // dtc01.sample.secret
    console.log("DT URL: " + dt_url);
    console.log("DT API TOKEN: " + dt_api_token);

    // TODO trim trailing slash if present
    let dt_pages_file = process.env.dt_path_to_pages_file;
    // TODO error checking if file hasn't been created

    // Read array
    let rawdata = fs.readFileSync(dt_pages_file);
    let pages_file = JSON.parse(rawdata);

    // Create one-off synthetic checks for each page
    pages_file.forEach((element, index, array) =>
        console.log(baseUrl + element['path'] + " must respond in: " + element['time'])
    )

    const { git } = utils;

    /* Do stuff if files modified */
    if (git.modifiedFiles.length !== 0) {
      console.log('Modified files:', git.modifiedFiles);
    }

    /* Do stuff only if html code edited */
    const htmlFiles = git.fileMatch('**/*.html');
    console.log('html files git info:', htmlFiles);

    if (htmlFiles.edited.length !== 0) {
      console.log('>> Run thing because HTML has changed\n');
    }
    
    /* Do stuff only if markdown files edited */
    const markdownFiles = git.fileMatch('**/*.md');
    console.log('markdown files git info:', markdownFiles);

    if (markdownFiles.modified.length !== 0) {
      console.log('>> Run thing because Markdown files have been created/changed/deleted\n');
    }

  }
}

/*
module.exports = {
  onSuccess: ({ constants, netlifyConfig, packageJson}) => {
    console.log("Hello world from onSuccess event!");
    //console.log('---------------');
    //console.log('Printing constants');
    //console.log(constants);
    console.log('---------------');
    console.log('Printing netlifyConfig');
    console.log(netlifyConfig);
    console.log('---------------');
    console.log('Printing packageJson')
    console.log(packageJson);
    console.log('---------------');
  },
}
*/