import prisma from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next';
//triggered when a user signs up by a webhook 
export default async function handler(req: NextApiRequest,res: NextApiResponse){
    const {email,secret}:{email:string,secret:string}=req.body
    if(req.method!=='POST'){
        return res.status(403).json({message:'Method not allowed'})
    }
    if(secret!==process.env.AUTH0_HOOK_SECRET){
        return res.status(403).json({message:'invalid Secret'})

    }
    if(email){
        try{

            await prisma.user.create({
                data:{
                    email
                }
            })
        return res.status(201).json({message:`User with email: ${email} created successfully!`})
    }
    catch(err){
        
        return res.status(500).json({message:`server failed to create user`})
        }

    }


}