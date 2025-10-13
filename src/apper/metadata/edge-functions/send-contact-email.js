import apper from "https://cdn.apper.io/actions/apper-actions.js";
import { Resend } from "npm:resend";

export default apper.serve(async (request) => {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Method not allowed'
      }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid JSON in request body'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate required fields
    const { contactEmail, contactName, contactCompany } = body;
    
    if (!contactEmail || !contactName) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Contact email and name are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email address format'
      }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get Resend API key
    const resendApiKey = await apper.getSecret('RESEND_API_KEY');
    if (!resendApiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email service configuration missing'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Professional email template
    const subject = `Welcome to Nexus CRM - ${contactName}`;
    const htmlContent = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #333333;">
        <div style="background: linear-gradient(135deg, #7C3AED, #3B82F6); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Nexus CRM</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">Customer Relationship Management</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #7C3AED; margin: 0 0 20px 0; font-size: 24px;">Hello ${contactName}!</h2>
          
          <p style="line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
            We're excited to welcome you to our Nexus CRM system. Your contact information has been successfully added to our database.
          </p>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #7C3AED;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Your Contact Details:</h3>
            <p style="margin: 5px 0; font-size: 14px; color: #666;"><strong>Name:</strong> ${contactName}</p>
            <p style="margin: 5px 0; font-size: 14px; color: #666;"><strong>Email:</strong> ${contactEmail}</p>
            ${contactCompany ? `<p style="margin: 5px 0; font-size: 14px; color: #666;"><strong>Company:</strong> ${contactCompany}</p>` : ''}
          </div>
          
          <p style="line-height: 1.6; margin: 20px 0; font-size: 16px;">
            Our team is committed to providing you with exceptional service and support. If you have any questions or need assistance, please don't hesitate to reach out to us.
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <div style="display: inline-block; background: linear-gradient(135deg, #7C3AED, #3B82F6); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Thank you for choosing Nexus CRM
            </div>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            This email was sent from Nexus CRM. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `;

    const textContent = `
Hello ${contactName}!

We're excited to welcome you to our Nexus CRM system. Your contact information has been successfully added to our database.

Your Contact Details:
- Name: ${contactName}
- Email: ${contactEmail}
${contactCompany ? `- Company: ${contactCompany}` : ''}

Our team is committed to providing you with exceptional service and support. If you have any questions or need assistance, please don't hesitate to reach out to us.

Thank you for choosing Nexus CRM!

This email was sent from Nexus CRM. If you have any questions, please contact our support team.
    `;

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: 'Nexus CRM <noreply@nexuscrm.com>',
      to: [contactEmail],
      subject: subject,
      html: htmlContent,
      text: textContent,
      tags: [
        { name: 'category', value: 'welcome' },
        { name: 'contact_id', value: body.contactId?.toString() || 'unknown' }
      ]
    });

    if (emailResult.error) {
      return new Response(JSON.stringify({
        success: false,
        error: emailResult.error.message || 'Failed to send email'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      data: {
        emailId: emailResult.data?.id,
        recipient: contactEmail,
        subject: subject
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Handle unexpected errors
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error occurred while sending email'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});