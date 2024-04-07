import { NextRequest, NextResponse } from "next/server";
import fs, { writeFile, writeFileSync } from 'fs';

import path from 'path';

function getFileTypeFromBase64(base64String: string) {
    const base64Header = base64String.split(',')[0];
    const fileFormat = base64Header.split(';')[0].split('/')[1];
    return fileFormat;
}

export async function POST(req: NextRequest) {
    try {
        const { image, title } = await req.json();
        const fileType = getFileTypeFromBase64(image);

        // process.cwd(), 
        const filePath = path.join('public/images/');

        const optionalObj = {'fileName': title, 'type': fileType};

        const base64ToImage = require('base64-to-image');
        const imageInfo = await base64ToImage(image, filePath, optionalObj);

        return NextResponse.json({
            message: 'Image Saved Successfully',
            filePath: '/images/' + imageInfo.fileName
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { image } = await req.json();
        const filePath = path.join('public' + image);

        await fs.promises.access(filePath, fs.constants.F_OK);
        await fs.promises.unlink(filePath);
        return NextResponse.json({
            message: 'Image Deleted Successfully',
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}