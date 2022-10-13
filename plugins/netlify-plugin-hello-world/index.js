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
const http = require('https');

/*
  This plugin is designed to be used wherever a sitemap.xml is available
  1) It will create a .dynatrace folder in the repo
  2) It will create .dynatrace/config.json and populate it
  3) It will grab sitemap.xml from the baseUrl+"/sitemap.xml" and place it in the .dynatrace folder
*/
module.exports = {
  onSuccess: ({ constants, netlifyConfig, utils}) => {

    const { run } = utils

    let baseUrl = process.env.DEPLOY_PRIME_URL; // Netlify deploy preview or base URL
    let sitemapUrl = baseUrl+"/sitemap.xml";
    run.command("ls -l");
    run.command("git remote -v");
    console.log("Base URL: " + baseUrl);
    console.log("Sitemap URL: " + baseUrl);
    
    var dir = '.dynatrace';
    
    // If the .dynatrace directory doesn't already exist, create it.
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    
    // Download sitemap.xml from https://example.com/sitemap.xml
    const file = fs.createWriteStream(dir + "/sitemap.xml");
    const request = http.get(sitemapUrl, function(response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
        file.close();
        console.log("Download Completed. sitemap.xml written to .dynatrace/sitemap.xml");
    });
    });

    // TODO: Commit .dynatrace/config.yaml and sitemap to git
    // git add -A
    // git commit -m "add dynatrace config and sitemap.xml"
    // Hmm won't this cause an endless build loop?

    run.command("ls -l");

    // Old logic below
    /*

    console.log("Hello world from onSuccess event!");
    console.log(process.env)

    let baseUrl = process.env.DEPLOY_PRIME_URL; // Netlify deploy preview or base URL
  
    let dt_url = process.env.DT_ENVIRONMENT_URL; // https://abc12345.live.dynatrace.com
    let dt_api_token = process.env.FOO; // dtc01.sample.secret
    console.log("DT URL: " + dt_url);
    console.log("DT API TOKEN: " + dt_api_token);

    // TODO trim trailing slash if present
    let dt_pages_file = process.env.dt_path_to_pages_file;
    // TODO error checking if file hasn't been created

    // Read array
    let rawdata = fs.readFileSync(dt_pages_file);
    let pages_file = JSON.parse(rawdata);

    /* Create one-off synthetic checks for each page
     * Step 1: For each URL, see if an HTTP_CHECK already exists  (entities.read)
     * curl -X GET "https://jao16384.sprint.dynatracelabs.com/api/v2/entities?entitySelector=type%28HTTP_CHECK%29%2Ctag%28netlify%29" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token dtc01.***.***"
     *
    console.log("Fetching from ${dt_url}");

    const response = fetch(dt_url + "/api/v2/entities?entitySelector=type(HTTP_CHECK),tag(netlify)",
        {
          method: "GET",
          headers: {
            "Accept": "application/json; charset=utf-8",
            "Authorization": "Api-Token " + dt_api_token
          }
        });
    const data = response.json();
    console.log("Printing data from DT API GET:");
    console.log(data);

    /*
     * Step 2: Create an HTTP_CHECK for each URL
     * Step 2: Trigger that check
     * Step 3: Retrieve evaluations when done
     *
    pages_file.forEach((element, index, array) => {
        full_url = dt_url + element['path'];
        console.log(full_url + " must respond in: " + element['time'])
    })

    const { git } = utils;

    // Do stuff if files modified
    if (git.modifiedFiles.length !== 0) {
      console.log('Modified files:', git.modifiedFiles);
    }
    */
  }
}