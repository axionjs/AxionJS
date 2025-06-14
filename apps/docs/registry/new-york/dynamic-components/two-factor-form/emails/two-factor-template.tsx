export const getTwoFactorEmailTemplate = (token: string) => {
  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Two-Factor Authentication Code</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background-color: #f5f5f5; 
            }
            .container { 
              max-width: 600px; 
              margin: 40px auto; 
              background: white; 
              border-radius: 12px; 
              overflow: hidden; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px; 
              font-weight: 600; 
            }
            .content { 
              padding: 40px 30px; 
            }
            .code-container { 
              text-align: center; 
              margin: 30px 0; 
            }
            .code { 
              display: inline-block;
              font-size: 36px; 
              font-weight: bold; 
              padding: 20px 30px; 
              background: #f8f9fa; 
              border: 2px dashed #dee2e6;
              border-radius: 12px; 
              letter-spacing: 8px; 
              color: #495057;
              font-family: 'Courier New', monospace;
            }
            .info { 
              background: #e3f2fd; 
              border-left: 4px solid #2196f3; 
              padding: 15px 20px; 
              margin: 25px 0; 
              border-radius: 4px; 
            }
            .warning { 
              background: #fff3e0; 
              border-left: 4px solid #ff9800; 
              padding: 15px 20px; 
              margin: 25px 0; 
              border-radius: 4px; 
            }
            .footer { 
              background: #f8f9fa; 
              padding: 20px 30px; 
              text-align: center; 
              font-size: 14px; 
              color: #6c757d; 
              border-top: 1px solid #e9ecef; 
            }
            .btn {
              display: inline-block;
              padding: 12px 24px;
              background: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Two-Factor Authentication</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Secure your account with this verification code</p>
            </div>
            <div class="content">
              <h2 style="color: #333; margin-top: 0;">Your Verification Code</h2>
              <p>Enter the following code to complete your two-factor authentication:</p>
              
              <div class="code-container">
                <div class="code">${token}</div>
              </div>
              
              <div class="info">
                <strong>⏰ Time Sensitive:</strong> This code will expire in <strong>5 minutes</strong> for your security.
              </div>
              
              <div class="warning">
                <strong>🛡️ Security Notice:</strong> If you didn't request this code, please ignore this email and consider changing your password. Never share this code with anyone.
              </div>
              
              <p style="margin-top: 30px;">
                Having trouble? Make sure you're entering the code exactly as shown above, including any spaces or dashes.
              </p>
            </div>
            <div class="footer">
              <p>This is an automated security message from your application.</p>
              <p>Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

  const text = `
  Two-Factor Authentication Code
  
  Your verification code is: ${token}
  
  This code will expire in 5 minutes for security reasons.
  
  Security Notice: If you didn't request this code, please ignore this email and consider changing your password. Never share this code with anyone.
  
  Having trouble? Make sure you're entering the code exactly as shown above.
  
  This is an automated security message. Please do not reply to this email.
    `;

  return { html, text };
};
