import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const CollectionPage = lazy(() => import('../collection/collection.container'));
const CollectionsOverview = lazy(() => import('../../components/collections-overview/collections-overview.container'));

class ShopPage extends React.Component {
  // state = {
  //   loading: true,
  // };

  // unsubscribeFromSnapshot = null;

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
  // componentDidMount() {
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection('collections');
  //   collectionRef.get().then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({loading: false});
  //   })
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromSnapshot();
  // }

  //добавили redux-thunk
  //теперь то, что выше, нам не надо

  componentDidMount() {
    this.props.fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Suspense fallback={<div>...Loading</div>}>
          <Route exact path={`${match.path}`} component={CollectionsOverview} />
          <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
