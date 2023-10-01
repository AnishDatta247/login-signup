import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    //if email not found
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    await sendEmail({ email, emailType: "RESETPASS", userId: user._id });

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
