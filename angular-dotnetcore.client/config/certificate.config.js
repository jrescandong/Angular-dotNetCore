// Certificate configuration - can be shared across environments
module.exports = {
  getCertificatePaths: (certificateName) => {
    const baseFolder =
      process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

    return {
      baseFolder,
      certFilePath: `${baseFolder}/${certificateName}.pem`,
      keyFilePath: `${baseFolder}/${certificateName}.key`
    };
  },

  getCertificateName: () => {
    const certificateArg = process.argv
      .map(arg => arg.match(/--name=(?<value>.+)/i))
      .filter(Boolean)[0];

    return certificateArg ? certificateArg.groups.value : process.env.npm_package_name;
  }
};
