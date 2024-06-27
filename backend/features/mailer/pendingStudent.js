const sendEmail = require('../../utils/email')
const User = require('../../models/userModel');
const Class = require('../../models/classModel');

exports.pendingStudentMail = async ( user, classId ) => {
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
        < div style = "width: 100%; display: flex; justify-content: center; align-items: center; background-color: #f7f7f7;" >
            <div style="max-width: 600px; width: 100%; padding: 20px; display: flex; justify-content: center; margin-right: 20%; margin-left:20%;">
                <div style="background-color: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center; border: 2px solid #c0d6ff;">
                    <div style="padding: 20px;">
                        <h3 style="font-size: 24px;">Hi ${instructorName}</h3>
                        <p style="font-size: 17px; font-weight: bold;">${studentName} wants to join your class.</p>
                        <p style="font-size: 16px;">The name of the class you wish to join: ${className}.</p>
                        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
                            <a href="${acceptUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Accept</a>
                            <a href="${rejectUrl}" style="display: inline-block; padding: 12px 24px; background-color: #6c757d; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Reject</a>
                        </div>
                        <p style="font-size: 16px;">If you want to deal with it later, please ignore this email!</p>

                    </div>
                </div>
            </div>
    </div >
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