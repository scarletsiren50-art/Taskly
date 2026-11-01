const sendPasswordResetEmail = async ({
  email,
  name,
  resetUrl,
}) => {
  const apiKey = process.env.BREVO_API_KEY;


  const response = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",

      headers: {
        "api-key": apiKey,
        "accept": "application/json",
        "content-type": "application/json",
      },

      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_SENDER_EMAIL,
          name:
            process.env.BREVO_SENDER_NAME ||
            "Taskly",
        },

        to: [
          {
            email,
            name: name || "Taskly User",
          },
        ],

        subject: "Reset your Taskly password",

        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <div style="
              background: linear-gradient(
                135deg,
                #FFD23F,
                #FF8A3D,
                #FF2D8B
              );
              padding: 30px;
              text-align: center;
            ">
              <h1 style="color: #0C1821;">
                Taskly
              </h1>
            </div>

            <div style="
              padding: 30px;
              background: #FFFFF6;
            ">
              <h2>Reset Your Password</h2>

              <p>
                Hi ${name || "there"},
              </p>

              <p>
                We received a request to reset your Taskly password.
              </p>

              <p>
                Click the button below to create a new password.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a
                  href="${resetUrl}"
                  style="
                    background: #FF2D8B;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 8px;
                    display: inline-block;
                  "
                >
                  Reset Password
                </a>
              </div>

              <p>
                This link will expire in 15 minutes.
              </p>

              <p>
                If you did not request a password reset,
                you can safely ignore this email.
              </p>
            </div>
          </div>
        `,

        textContent: `
Taskly - Reset Your Password

Hi ${name || "there"},

We received a request to reset your Taskly password.

Reset your password here:
${resetUrl}

This link will expire in 15 minutes.

If you did not request a password reset, you can safely ignore this email.
        `,
      }),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    console.error(
      "Brevo API error:",
      response.status,
      responseData
    );

    throw new Error(
      responseData.message ||
        "Brevo email sending failed"
    );
  }

  console.log(
    "Brevo email sent:",
    responseData
  );

  return responseData;
};

module.exports = {
  sendPasswordResetEmail,
};