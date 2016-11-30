import { Meteor } from 'meteor/meteor';
import { Bins } from '../imports/collections/bins';

Meteor.startup(() => {
  Meteor.publish('bins', function() {
    return Bins.find({ ownerId: this.userId });
  });

  Meteor.publish('shared.bins', function() {
    const user = Meteor.users.findOne(this.userId);
    if (!user) {
      return;
    }
    const email = user.emails[0].address;

    return Bins.find({
      shareWith: { $elemMatch: { $eq: email }}
    });
  });
});
