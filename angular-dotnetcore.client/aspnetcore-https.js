// Entry point for HTTPS certificate setup
// This script orchestrates the certificate setup process
const certificateConfig = require('./certificate/config/certificate.config');
const certificateService = require('./certificate/services/certificate.service');

async function setupHttpsCertificate() {
  try {
    // Get certificate name from configuration
    const certificateName = certificateConfig.getCertificateName();

    if (!certificateName) {
      console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.');
      process.exit(-1);
    }

    // Get certificate paths
    const { baseFolder, certFilePath, keyFilePath } = certificateConfig.getCertificatePaths(certificateName);

    // Ensure directory exists
    certificateService.ensureDirectoryExists(baseFolder);

    // Check if certificate exists, generate if needed
    if (!certificateService.certificateExists(certFilePath, keyFilePath)) {
      console.log('Certificate not found. Generating new certificate...');
      await certificateService.generateCertificate(certFilePath);
      console.log('Certificate generated successfully.');
    } else {
      console.log('Certificate already exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error setting up HTTPS certificate:', error.message);
    process.exit(-1);
  }
}

// Run the setup
setupHttpsCertificate();
