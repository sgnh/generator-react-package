const Generator = require('yeoman-generator');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname,
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
    }, {
      type: 'input',
      name: 'componentName',
      message: 'Component name',
      default: 'MyComponent',
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Author name',
      store: true,
    }]).then((answers) => {
      this.name = answers.name;
      this.description = answers.description;
      this.componentName = answers.componentName;
      this.authorName = answers.authorName;
    });
  }

  configuring() {
    this._writePackageJson();

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copyTpl(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    this.config.save();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('scripts/copy-files.js'),
      this.destinationPath('scripts/copy-files.js'),
      { componentName: this.componentName }
    );

    this.fs.copyTpl(
      this.templatePath('src/MyComponent.jsx'),
      this.destinationPath(`src/${this.componentName}.jsx`),
      { componentName: this.componentName }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { componentName: this.componentName }
    );

    this.fs.copyTpl(
      this.templatePath('CHANGELOG.md'),
      this.destinationPath('CHANGELOG.md')
    );

    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      { authorName: this.authorName }
    );
  }

  install() {
    this.yarnInstall([
      'babel-cli',
      'babel-preset-env',
      'babel-preset-react',
      'eslint',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-config-airbnb',
      'fs-extra',
      'react',
      'rimraf',
    ], { dev: true });
  }

  _writePackageJson() {
    const pkg = {
      name: this.name,
      version: '1.0.0',
      description: this.description,
      scripts: {
        build: 'npm run build:babel && npm run build:copy-files',
        'build:babel': 'babel src -d build/lib',
        'build:copy-files': 'babel-node ./scripts/copy-files.js',
        dev: 'babel -w src -d build/lib',
        clean: 'rimraf build',
      },
      keywords: [],
      author: this.authorName,
      license: 'MIT',
      peerDependencies: {
        react: '^0.14.0 || ^15.0.0',
      },
      private: true,
    };

    fs.writeFileSync(this.destinationPath('package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
  }
};
