import { config } from '@gig/config';
import { winstonLogger } from '@irshadkhan2019/job-app-shared';
import { Logger } from 'winston';
import { client } from '@gig/redis/redis.connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gigCache', 'debug');

// Redis usage:anytime user clicks on category we store that category name in redis cache for that user and when that user 
// go back to home page we use that stored category name in redis to fetch some document of gigs based on that category.
// When user clicks different gig that has diff category then we replace it with prev one and fetch doc based on this new category.

// just fetch a category ,insert method is in api gateway service
const getUserSelectedGigCategory = async (key: string): Promise<string> => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
    const response: string = await client.GET(key) as string;
    return response;
  } catch (error) {
    log.log('error', 'GigService GigCache getUserSelectedGigCategory() method error:', error);
    return '';
  }
};

export { getUserSelectedGigCategory };