// Certificate service - handles certificate operations
const fs = require('fs');
const { spawn } = require('child_process');

class CertificateService {
  ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  certificateExists(certFilePath, keyFilePath) {
    return fs.existsSync(certFilePath) && fs.existsSync(keyFilePath);
  }

  generateCertificate(certFilePath) {
    return new Promise((resolve, reject) => {
      const dotnetProcess = spawn('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
      ], { stdio: 'inherit' });

      dotnetProcess.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Certificate generation failed with code ${code}`));
        }
      });

      dotnetProcess.on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = new CertificateService();
