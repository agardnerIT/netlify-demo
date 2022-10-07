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

module.exports = {
  onPostBuild: ({ constants, netlifyConfig, utils}) => {

    console.log("Hello world from onPostBuild event!");
    console.log(constants);
    console.log("--------------------------");
    console.log(netlifyConfig);

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