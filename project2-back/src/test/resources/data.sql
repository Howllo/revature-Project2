drop table if exists app_user;
drop table if exists follower_following
create table app_user (
    id int primary key auto_increment,
    email text not null unique,
    password varchar(255),
    displayName varchar(255),
    username varchar(255),
    profile_pic varchar(255),
    banner_pic varchar(255),
    biography varchar(300),
    user_role varchar(30),
    created_at timestamp
);

create table follower_following (
    follower_id primary key int not null,
    following_id primary key int not null,
    foreign key (follower_id) references app_user(id),
    foreign key (following_id) references app_user(id)
)

insert into app_user values (9999, 'fakeEmail@email.com', 'abc123', 'testuser1', 'Test1', 'apiebju4p39wpbgve4', 'bpewikab392je2', 'This is a biography 1', 'Role A', NOW() );
insert into app_user values (9998, 'notAEmail@email.net', 'cba321', 'testuser2', 'Test2', 'aesifearhas44ewgve4', '486Q2FTEUYBGFSJ', 'This is a biography 2', 'Role b', NOW());
insert into app_user values (9997, 'realEmail@email.gov', '321cba', 'testuser3', 'Test3', 'apiewefadadawpbgvsd3', 'bpewasdfe392je2', 'This is a biography 3', 'Role C', NOW());

insert into follower_following values (9999, 9998);
insert into follower_following values (9997, 9999);
insert into follower_following values (9999, 9997);

