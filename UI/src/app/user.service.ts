import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

export interface User {
    allUsers: [{
        fname: string;
        lname: string;
        phone: string;
        email: string;
    }]
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userQuery: QueryRef<any>;
    constructor(private apollo: Apollo) {
        this.userQuery = this.apollo.watchQuery({
            query: gql`query allUsers{allUsers{
                id,
                fname,
                lname,
                phone,
                email
            }}`
        });
    }
    async getUsers(): Promise<User> {
        const result = await this.userQuery.refetch();
        console.log(result.data.allUsers);
        return result.data.allUsers;
    }

    async addUser(user:any): Promise<any> {
        let CREATE_USER_MUTATION = gql`
        mutation createUser(
                $fname: String!,
                $lname: String!,
                $phone: String!,
                $email: String!) {
                    createUser(fname: $fname, lname: $lname,phone: $phone, email: $email,)}`;

        this.apollo.mutate<any>({
            mutation: CREATE_USER_MUTATION,
            variables: {
                fname: user.fname,
                lname: user.lname,
                phone: user.phone,
                email: user.email
            }
          }).subscribe((response) => {
            return response;
          });
    }

    async editUser(user:any): Promise<any> {
        let UPDATE_USER_MUTATION = gql`
        mutation updateUser(
                $id: ID!,
                $fname: String!,
                $lname: String!,
                $phone: String!,
                $email: String!) {
                    updateUser(id: $id, fname: $fname, lname: $lname,phone: $phone, email: $email,)}`;

        this.apollo.mutate<any>({
            mutation: UPDATE_USER_MUTATION,
            variables: {
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                phone: user.phone,
                email: user.email
            }
          }).subscribe((response) => {
            return response;
          });
    }

    async deleteUser(user:any): Promise<any> {
        let DELETE_USER_MUTATION = gql`
        mutation deleteUser(
                $id: ID!) {
                    deleteUser(id: $id)}`;
        this.apollo.mutate<any>({
            mutation: DELETE_USER_MUTATION,
            variables: {
                id: user.id
            }
          }).subscribe((response) => {
            return response;
          });
    }
}