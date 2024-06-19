const sendEmail = require('./../utils/email');

exports.pendingStudentMail = async (student) => {
    const email = User.email;
    const studentName = user.firstName + ' ' + user.lastName;
    const acceptUrl = `${process.env.FRONTEND_URL}/pending-students/`;
    const rejectUrl = `${process.env.FRONTEND_URL}/pending-students/`;
    const className = User.className;
    const subject = 'A new pending student!';
    const message = ''


try{
    await sendEmail({
        email,
        subject,
        html: message
    });
}

catch(err){
    console.log(err);
}
}