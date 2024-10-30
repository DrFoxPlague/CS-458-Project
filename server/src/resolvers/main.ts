// MAIN FILE FOR ALL RESOLVERS(tells what the schemas should do)

// To-Do:
/* 
    - Create mongoose schemas under /server/src/schemas
    - Actually create the resolvers... :P
*/

import exhibits from "./exhibits";

export const resolvers = {
    Query: {
        ...exhibits.Query
    },
    Mutation: {
        ...exhibits.Mutation
    }
};