import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';;
import { Bins } from '../../../imports/collections/bins';

class BinsList extends Component {
  onBinremove(bin) {
    Meteor.call('bins.remove', bin);
  }
  renderList() {
    return this.props.bins.map(bin => {
      return (
        <li className="list-group-item" key={bin._id}>
          Bin {bin._id}
          <span className="pull-right">
            <button className="btn btn-danger"
                    onClick={() => this.onBinremove(bin)}>
              Remove
            </button>
          </span>
        </li>
      )
    });
  }

  render() {
    return (
      <ul className="list-group">
        { this.renderList() }
      </ul>
    )
  }
}

export default createContainer(()=>{
  Meteor.subscribe('bins');
  return { bins: Bins.find({}).fetch() };
}, BinsList);
