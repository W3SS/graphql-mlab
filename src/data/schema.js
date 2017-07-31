import {
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
} from 'graphql';

import Session from '../models/session';

const viewer = {};

export const sessionType = new GraphQLObjectType({
	name: 'Session',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		day: { type: new GraphQLNonNull(GraphQLInt) },
		title: { type: new GraphQLNonNull(GraphQLString) },
		slot: { type: new GraphQLNonNull(GraphQLString) },
		speakers: { type: new GraphQLList(GraphQLString) }
	})
});

export const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	fields: () => ({
		sessions: {
			type: new GraphQLList(sessionType),
			resolve: async () =>  await Session.find({})
		}
	})
});

const schema = () => new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			viewer: {
				type: viewerType,
				resolve: () => viewer
			}
		})
	})
});

export default schema;