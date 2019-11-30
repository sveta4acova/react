import React, { } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection('collections');
  //   this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({loading: false});
  //   })
  // }

  //с использованием метода get
  // он возвращает Promise
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false});
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} component={props => <CollectionsPageWithSpinner isLoading={loading} {...props}/>} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
