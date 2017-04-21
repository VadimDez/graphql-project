/**
 * Created by Vadym Yatsyuk on 20/11/2016
 */
export class UserService {
  static get(id, fields = 'id,name,phone') {
    return fetch(`/graphql?query={user(id:${ id }){${ fields }}}`)
      .then(res => res.json());
  }
}