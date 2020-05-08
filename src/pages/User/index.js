import React, {Component} from 'react';
import api from '../../services/api';
import Lottie from 'lottie-react-native';

import { Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnedAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {

  state = {
    repositories: [],
    loading: true,
    page: 1,
    refreshing: false,
  };

  async componentDidMount(){

    this.load();
  }

  load = async (page = 1) => {
    const { repositories } = this.state;
    const type = this.props.route.params.type;

    const user = this.props.route.params.user;

    const response = await api.get(`/users/${user.login}/${type}?sort=created`,{
      params: { page },
    });

    this.setState({
      repositories: page >= 2 ? [...repositories, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    })
  }

  loadMore = () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.load(nextPage);
  };

  refreshList = () => {
    this.setState({ refreshing: true, repositories: [] }, this.load);
  };

  handleNavigate = (repository) =>{
    const { navigation } = this.props;

    console.log(repository);

    navigation.navigate('Repository', { repository });
  }

  render(){

    const { repositories, loading, refreshing } = this.state;

    const user = this.props.route.params.user;

    return(
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          //<Loading/>
          <Lottie resizeMode="contain" source={ require('../../assets/rocket.json') } autoPlay loop />
        ) : (
          <Stars
            data={repositories}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            keyExtractor={repository => String(repository.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnedAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
