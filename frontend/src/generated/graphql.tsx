import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: UserAuth;
};

export type Box = {
  __typename?: 'Box';
  boxTypeId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parentBoxId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoxType = {
  __typename?: 'BoxType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BoxTypeInput = {
  name: Scalars['String']['input'];
  quantity?: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** Поле для сортировки типов коробок */
export enum BoxTypeSortField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME',
  Quantity = 'QUANTITY',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT'
}

export type BoxTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type BoxTypesQueryDto = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<BoxTypeSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Brand = {
  __typename?: 'Brand';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BrandInput = {
  name: Scalars['String']['input'];
};

/** Поле для сортировки брендов */
export enum BrandSortField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type BrandUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BrandsQueryDto = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<BrandSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignRole: User;
  assignRoleToUser: Role;
  createBoxType: BoxType;
  createBrand: Brand;
  createProduct: ProductWithBrand;
  createRole: Role;
  createUser: User;
  deleteBoxType: BoxType;
  deleteBrand: Brand;
  deleteProduct: ProductWithBrand;
  deleteRole: Role;
  deleteUser: User;
  login: AuthResponse;
  logout: Scalars['String']['output'];
  refreshToken: AuthResponse;
  removeRole: User;
  removeRoleFromUser: Role;
  updateBoxType: BoxType;
  updateBrand: Brand;
  updateProduct: ProductWithBrand;
  updateRole: Role;
  updateUser: User;
};


export type MutationAssignRoleArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationAssignRoleToUserArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateBoxTypeArgs = {
  input: BoxTypeInput;
};


export type MutationCreateBrandArgs = {
  input: BrandInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationCreateRoleArgs = {
  data: RoleInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteBoxTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteBrandArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRemoveRoleArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationRemoveRoleFromUserArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUpdateBoxTypeArgs = {
  id: Scalars['Int']['input'];
  input: BoxTypeUpdateInput;
};


export type MutationUpdateBrandArgs = {
  id: Scalars['Int']['input'];
  input: BrandUpdateInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['Int']['input'];
  input: ProductUpdateInput;
};


export type MutationUpdateRoleArgs = {
  data: RoleUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  id: Scalars['Int']['input'];
};

export type PaginatedBoxTypesResponse = {
  __typename?: 'PaginatedBoxTypesResponse';
  rows: Array<BoxType>;
  total: Scalars['Float']['output'];
};

export type PaginatedBrandsResponse = {
  __typename?: 'PaginatedBrandsResponse';
  rows: Array<Brand>;
  total: Scalars['Int']['output'];
};

export type PaginatedProductsResponse = {
  __typename?: 'PaginatedProductsResponse';
  rows: Array<ProductWithBrand>;
  total: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  brandId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductInput = {
  brandId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: ProductType;
};

/** Поле для сортировки продуктов */
export enum ProductSortField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT'
}

/** Тип продукта */
export enum ProductType {
  Cartridge = 'CARTRIDGE',
  Gel = 'GEL',
  Paint = 'PAINT',
  Transfer = 'TRANSFER'
}

export type ProductUpdateInput = {
  brandId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type ProductWithBrand = {
  __typename?: 'ProductWithBrand';
  brand: Brand;
  brandId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductsQueryDto = {
  brandId?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ProductSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ProductType>;
};

export type Query = {
  __typename?: 'Query';
  boxType: BoxType;
  boxTypesWithPagination: PaginatedBoxTypesResponse;
  brand: Brand;
  brandsWithPagination: PaginatedBrandsResponse;
  getProfile: Scalars['String']['output'];
  product: ProductWithBrand;
  products: Array<ProductWithBrand>;
  productsWithPagination: PaginatedProductsResponse;
  role?: Maybe<Role>;
  roleByName?: Maybe<Role>;
  roles?: Maybe<Array<Role>>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryBoxTypeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBoxTypesWithPaginationArgs = {
  query: BoxTypesQueryDto;
};


export type QueryBrandArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBrandsWithPaginationArgs = {
  query: BrandsQueryDto;
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductsWithPaginationArgs = {
  query: ProductsQueryDto;
};


export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoleByNameArgs = {
  name: RoleType;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RoleBasic = {
  __typename?: 'RoleBasic';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type RoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Тип роли */
export enum RoleType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type RoleUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Порядок сортировки */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<RoleBasic>;
  roleId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserAuth = {
  __typename?: 'UserAuth';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  lastName: Scalars['String']['output'];
  role?: Maybe<RoleBasic>;
};

export type UserBasic = {
  __typename?: 'UserBasic';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'UserAuth', id: number, email: string, firstName: string, lastName: string, role?: { __typename?: 'RoleBasic', id: number, name: string } | null } } };

export type LogoutMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type GetBoxTypeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBoxTypeQuery = { __typename?: 'Query', boxType: { __typename?: 'BoxType', id: number, name: string, quantity: number, type: string, createdAt: string, updatedAt: string } };

export type GetBoxTypesQueryVariables = Exact<{
  query: BoxTypesQueryDto;
}>;


export type GetBoxTypesQuery = { __typename?: 'Query', boxTypesWithPagination: { __typename?: 'PaginatedBoxTypesResponse', total: number, rows: Array<{ __typename?: 'BoxType', id: number, name: string, quantity: number, type: string, createdAt: string, updatedAt: string }> } };

export type GetBrandQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBrandQuery = { __typename?: 'Query', brand: { __typename?: 'Brand', id: number, name: string, createdAt: string, updatedAt: string } };

export type GetBrandsQueryVariables = Exact<{
  query: BrandsQueryDto;
}>;


export type GetBrandsQuery = { __typename?: 'Query', brandsWithPagination: { __typename?: 'PaginatedBrandsResponse', total: number, rows: Array<{ __typename?: 'Brand', id: number, name: string, createdAt: string, updatedAt: string }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'ProductWithBrand', id: number, name: string, brandId: number, createdAt: string, type: ProductType, updatedAt: string, brand: { __typename?: 'Brand', id: number, name: string } } };

export type GetProductsWithPaginationQueryVariables = Exact<{
  query: ProductsQueryDto;
}>;


export type GetProductsWithPaginationQuery = { __typename?: 'Query', productsWithPagination: { __typename?: 'PaginatedProductsResponse', total: number, rows: Array<{ __typename?: 'ProductWithBrand', id: number, name: string, brandId: number, createdAt: string, type: ProductType, updatedAt: string, brand: { __typename?: 'Brand', name: string } }> } };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    access_token
    refresh_token
    user {
      id
      email
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($refreshToken: String!) {
  logout(refreshToken: $refreshToken)
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetBoxTypeDocument = gql`
    query GetBoxType($id: Int!) {
  boxType(id: $id) {
    id
    name
    quantity
    type
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBoxTypeQuery__
 *
 * To run a query within a React component, call `useGetBoxTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoxTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoxTypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBoxTypeQuery(baseOptions: Apollo.QueryHookOptions<GetBoxTypeQuery, GetBoxTypeQueryVariables> & ({ variables: GetBoxTypeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoxTypeQuery, GetBoxTypeQueryVariables>(GetBoxTypeDocument, options);
      }
export function useGetBoxTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoxTypeQuery, GetBoxTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoxTypeQuery, GetBoxTypeQueryVariables>(GetBoxTypeDocument, options);
        }
export function useGetBoxTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoxTypeQuery, GetBoxTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoxTypeQuery, GetBoxTypeQueryVariables>(GetBoxTypeDocument, options);
        }
export type GetBoxTypeQueryHookResult = ReturnType<typeof useGetBoxTypeQuery>;
export type GetBoxTypeLazyQueryHookResult = ReturnType<typeof useGetBoxTypeLazyQuery>;
export type GetBoxTypeSuspenseQueryHookResult = ReturnType<typeof useGetBoxTypeSuspenseQuery>;
export type GetBoxTypeQueryResult = Apollo.QueryResult<GetBoxTypeQuery, GetBoxTypeQueryVariables>;
export const GetBoxTypesDocument = gql`
    query GetBoxTypes($query: BoxTypesQueryDto!) {
  boxTypesWithPagination(query: $query) {
    rows {
      id
      name
      quantity
      type
      createdAt
      updatedAt
    }
    total
  }
}
    `;

/**
 * __useGetBoxTypesQuery__
 *
 * To run a query within a React component, call `useGetBoxTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoxTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoxTypesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetBoxTypesQuery(baseOptions: Apollo.QueryHookOptions<GetBoxTypesQuery, GetBoxTypesQueryVariables> & ({ variables: GetBoxTypesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoxTypesQuery, GetBoxTypesQueryVariables>(GetBoxTypesDocument, options);
      }
export function useGetBoxTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoxTypesQuery, GetBoxTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoxTypesQuery, GetBoxTypesQueryVariables>(GetBoxTypesDocument, options);
        }
export function useGetBoxTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoxTypesQuery, GetBoxTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoxTypesQuery, GetBoxTypesQueryVariables>(GetBoxTypesDocument, options);
        }
export type GetBoxTypesQueryHookResult = ReturnType<typeof useGetBoxTypesQuery>;
export type GetBoxTypesLazyQueryHookResult = ReturnType<typeof useGetBoxTypesLazyQuery>;
export type GetBoxTypesSuspenseQueryHookResult = ReturnType<typeof useGetBoxTypesSuspenseQuery>;
export type GetBoxTypesQueryResult = Apollo.QueryResult<GetBoxTypesQuery, GetBoxTypesQueryVariables>;
export const GetBrandDocument = gql`
    query GetBrand($id: Int!) {
  brand(id: $id) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBrandQuery__
 *
 * To run a query within a React component, call `useGetBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBrandQuery(baseOptions: Apollo.QueryHookOptions<GetBrandQuery, GetBrandQueryVariables> & ({ variables: GetBrandQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
      }
export function useGetBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandQuery, GetBrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
        }
export function useGetBrandSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandQuery, GetBrandQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
        }
export type GetBrandQueryHookResult = ReturnType<typeof useGetBrandQuery>;
export type GetBrandLazyQueryHookResult = ReturnType<typeof useGetBrandLazyQuery>;
export type GetBrandSuspenseQueryHookResult = ReturnType<typeof useGetBrandSuspenseQuery>;
export type GetBrandQueryResult = Apollo.QueryResult<GetBrandQuery, GetBrandQueryVariables>;
export const GetBrandsDocument = gql`
    query GetBrands($query: BrandsQueryDto!) {
  brandsWithPagination(query: $query) {
    rows {
      id
      name
      createdAt
      updatedAt
    }
    total
  }
}
    `;

/**
 * __useGetBrandsQuery__
 *
 * To run a query within a React component, call `useGetBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetBrandsQuery(baseOptions: Apollo.QueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables> & ({ variables: GetBrandsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
      }
export function useGetBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
        }
export function useGetBrandsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
        }
export type GetBrandsQueryHookResult = ReturnType<typeof useGetBrandsQuery>;
export type GetBrandsLazyQueryHookResult = ReturnType<typeof useGetBrandsLazyQuery>;
export type GetBrandsSuspenseQueryHookResult = ReturnType<typeof useGetBrandsSuspenseQuery>;
export type GetBrandsQueryResult = Apollo.QueryResult<GetBrandsQuery, GetBrandsQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: Int!) {
  product(id: $id) {
    id
    name
    brandId
    createdAt
    type
    updatedAt
    brand {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables> & ({ variables: GetProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsWithPaginationDocument = gql`
    query GetProductsWithPagination($query: ProductsQueryDto!) {
  productsWithPagination(query: $query) {
    rows {
      id
      name
      brand {
        name
      }
      brandId
      createdAt
      type
      updatedAt
    }
    total
  }
}
    `;

/**
 * __useGetProductsWithPaginationQuery__
 *
 * To run a query within a React component, call `useGetProductsWithPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsWithPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsWithPaginationQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetProductsWithPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables> & ({ variables: GetProductsWithPaginationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>(GetProductsWithPaginationDocument, options);
      }
export function useGetProductsWithPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>(GetProductsWithPaginationDocument, options);
        }
export function useGetProductsWithPaginationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>(GetProductsWithPaginationDocument, options);
        }
export type GetProductsWithPaginationQueryHookResult = ReturnType<typeof useGetProductsWithPaginationQuery>;
export type GetProductsWithPaginationLazyQueryHookResult = ReturnType<typeof useGetProductsWithPaginationLazyQuery>;
export type GetProductsWithPaginationSuspenseQueryHookResult = ReturnType<typeof useGetProductsWithPaginationSuspenseQuery>;
export type GetProductsWithPaginationQueryResult = Apollo.QueryResult<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>;