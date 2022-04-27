const { Schema, model, Types } = require('mongoose');
const date = require('../utils/date');
const ReactionSchema = require('./Reaction');

const ReactionSchema = new Schema(
    {
      // sets custom id 
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => date(timestamp)
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
  }
)


const Thought = model('Thought', ThoughtSchema);

  // Count quantity of friends 
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });


module.exports = Thought;