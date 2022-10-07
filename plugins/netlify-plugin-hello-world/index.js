// https://docs.netlify.com/integrations/build-plugins/create-plugins

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

module.exports = {
  onPostBuild: ({ constants, netlifyConfig, packageJson}) => {
    console.log("Hello world from onPostBuild event!");
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