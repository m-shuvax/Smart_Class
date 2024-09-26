const sendEmail = require('../../utils/email')
const User = require('../../models/userModel');
const Class = require('../../models/classModel');

exports.pendingStudentMail = async (user, classId) => {
    const className = (await Class.findById(classId)).name;
    const instructorId = (await Class.findById(classId)).instructor;
    const instructor = await User.findById(instructorId);
    const instructorName = instructor.firstName + ' ' + instructor.lastName;
    const instructorEmail = instructor.email;
    const studentId = user._id
    const studentName = user.firstName + ' ' + user.lastName;
    const acceptUrl = `${process.env.FRONTEND_URL}/PendingStudent?studentId=${studentId}&classId=${classId}&action=approve`;
    const rejectUrl = `${process.env.FRONTEND_URL}/PendingStudent?studentId=${studentId}&classId=${classId}&action=reject`;
    const subject = 'A new pending student!';
    const message = `
       <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #f7f7f7; text-align: center;">
  <div style="background-color: white; border-radius: 10px; border: 2px solid #c0d6ff; padding: 20px; margin: 20px;">
    <h3 style="font-size: 24px; margin-bottom: 10px;">Hi ${instructorName}</h3>
    <p style="font-size: 17px; font-weight: bold; margin-bottom: 10px;">${studentName} wants to join your class.</p>
    <p style="font-size: 16px; margin-bottom: 20px;">The name of the class you wish to join: ${className}.</p>
    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
      <tr>
        <td style="padding-right: 10px;">
          <a href="${acceptUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Accept</a>
        </td>
        <td style="padding-left: 10px;">
          <a href="${rejectUrl}" style="display: inline-block; padding: 12px 24px; background-color: #6c757d; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Reject</a>
        </td>
      </tr>
    </table>
    <p style="font-size: 16px; margin-top: 20px;">If you want to deal with it later, please ignore this email!</p>
  </div>
</div>
        `;


    try {
        await sendEmail({
            email: instructorEmail,
            subject,
            html: message
        });
    }

    catch (err) {
        console.log(err);
    }
}