// This endpoint has been removed for security reasons.
// Product seeding should be done via the Supabase dashboard or admin UI,
// not via an unauthenticated API endpoint.
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(
        { error: 'This endpoint has been disabled.' },
        { status: 403 }
    );
}
