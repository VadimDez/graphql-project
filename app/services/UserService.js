/**
 * Created by Vadym Yatsyuk on 20/11/2016
 */
export class UserService {
  static get(id) {
    return fetch(`/graphql?query={user(id:"${ id }"){id,name}}`)
      .then(res => res.json());
  }
}