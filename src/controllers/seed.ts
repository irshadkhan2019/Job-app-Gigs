import { publishDirectMessage } from '@gig/queues/gig.producer';
import { gigChannel } from '@gig/Server';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const gig = async (req: Request, res: Response): Promise<void> => {
  const { count } = req.params;
//   publish msg to users service ,for sellers eg. i need 10 sellers,User consume this msg and
// again publish msg with 10 sellers so that gigs service consume it and using that 10 sellers
//seeding is done. 

  await publishDirectMessage(
    gigChannel,
    'jobber-gig',
    'get-sellers',
    JSON.stringify({ type: 'getSellers', count }),
    'Gig seed message sent to user service.'
  );
  res.status(StatusCodes.CREATED).json({ message: 'Gig created successfully'});
};

export { gig };