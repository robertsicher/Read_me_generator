const inquirer = require("inquirer");
const fs = require('fs');

//Questions

const promptUser = () =>
  inquirer.prompt([{
      type: 'input',
      name: 'questionReadMeName',
      message: 'Enter a file name for you Readme',
    },
    {
      type: 'input',
      name: 'questionName',
      message: 'Enter your name',
    },
    {
      type: 'input',
      name: 'questionUsername',
      message: 'Enter your GitHub username',
    },
    {
      type: 'input',
      name: 'questionRepository',
      message: 'Enter the GitHub repository name',
    },
    {
      type: "list",
      name: "questionLicense",
      message: "Which license do you wish to use?",
      choices: ["MIT", "Apache", "GPL"],
    },
    {
      type: 'input',
      name: 'questionDescription',
      message: 'Enter the project description',
    },
    {
      type: 'input',
      name: 'questionImage',
      message: 'Enter the file path for the image you wish to display',
    },
    {
      type: 'input',
      name: 'questionInstallation',
      message: 'Enter installation directions',
    },
    {
      type: 'input',
      name: 'questionUsage',
      message: 'Enter any usage information',
    },
    {
      type: 'input',
      name: 'questionContribution',
      message: 'Enter any contributing information',
    },
    {
      type: 'input',
      name: 'questionTesting',
      message: 'Enter any testing information',
    },
    {
      type: 'input',
      name: 'questionEmail',
      message: 'Enter your email',
    },

  ]);

const generateReadme = (answers) => {
  console.log(answers)
  //SEPERATE THE Returns into the sections on IF statements

  return `
  # ${answers.questionReadMeName}


  ## Table of contents:
  
  [Description](##description)
  
  [Installation](##installation)
  
  [Usage](##usage)
  
  [Author](##author)
  
  [Contributing](##contributing)
  
  [Tests](##tests)
  
  [Contact](##contact)

  [License](##license)
  
  ## Description
  ${answers.questionDescription}
  
  
  ## Installation 
  ${answers.questionInstallation} 
  
  ## Usage
  ${answers.questionUsage}
  
  See it in action:
  https://${answers.questionUsername}.github.io/${answers.questionRepository}/
  
  ![An image of it in action ](${answers.questionImage})
  
  
  ## Author
  ${answers.questionName}
  
  ## Contributing
  ${answers.questionContribution}

  ## License
  ${licenseAnswer(answers.questionLicense)}

  ## Tests 
  ${answers.questionTesting}
  
  
  ## Contact 
  ${answers.questionEmail}

  Github profile: 
  https://github.com/${answers.questionUsername}
 
  `;
}

function licenseAnswer(answer) {
  if (answer == "MIT") {
    return (
`
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
Copyright (c) 2020

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`);
  } else if (answer == "Apache") {
    return (
`
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
Copyright 2020

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing
permissions and limitations under the License.`);
  } else {
    return (
`
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
Copyright (C) 2020

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
    
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.`);
  }
}
promptUser()
  .then((answers) => {
    console.log("answers", answers);
    const readMeContent = generateReadme(answers);
    console.log("html", readMeContent);
    fs.writeFileSync(answers.questionReadMeName + '.md', readMeContent);
    //writeFileAsync('index.html', generateHTML(answers));
  })
  .then(() => console.log('Successfully wrote the Readme'))
  .catch((err) => console.error(err));