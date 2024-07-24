import { NextResponse } from 'next/server';

let profiles = [];

export async function GET() {
    return NextResponse.json(profiles);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newProfile = { id: Date.now(), ...body };
    profiles.push(newProfile);
    return NextResponse.json(newProfile);
}

export async function PUT(request: Request) {
    const body = await request.json();
    profiles = profiles.map(profile => profile.id === body.id ? body : profile);
    return NextResponse.json(body);
}

export async function DELETE(request: Request) {
    const body = await request.json();
    profiles = profiles.filter(profile => profile.id !== body.id);
    return NextResponse.json({ id: body.id });
}
