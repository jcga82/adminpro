import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

const uri = 'https://gesletter.es:7388/api/v1/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({uri: 'https://gesletter.es:7388/api/v1/graphql'});
        const middleware = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: new HttpHeaders().set(
              'Authorization',
              // `Bearer ${localStorage.getItem('token') || null}`,
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZTgxOTRiZTYzODI5ODA0ZjA0MWUxNGUiLCJuYW1lIjoiYWRtaW4iLCJtYWlsIjoiYWRtaW5AbGV0dGVyLmVzIiwibGV2ZWwiOiJBRE1JTiIsImV4cCI6MTYxMDM4MDQ2OX0.9UnAut5R8iRwVwZk6TL93jz2ZsdetdXqitFnDP8Nl-c'
            ),
          });
          return forward(operation);
        });

        const link = middleware.concat(http);

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
