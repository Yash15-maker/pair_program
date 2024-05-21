import { db } from "@/db";
import { NextResponse } from 'next/server';
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";

export async function GET(request: Request, response: NextResponse) {
    // const userId="e3492728-7556-4ad8-b3a1-9417df5e5d01";
    try {
        const result = await db.query.users.findFirst();
        return NextResponse.json(result)
    } catch (err) {
        console.log(err);
    }
}
