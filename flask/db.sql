--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: posts_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_table (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    date_posted date DEFAULT CURRENT_DATE NOT NULL,
    content character varying(300) NOT NULL,
    user_id integer
);


ALTER TABLE public.posts_table OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts_table.id;


--
-- Name: users_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_table (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200),
    posts integer,
    facebook character varying(200),
    instagram character varying(200),
    gender character varying(200),
    age integer
);


ALTER TABLE public.users_table OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users_table.id;


--
-- Name: posts_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_table ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_table ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: posts_table posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_table
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users_table users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_table
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_table users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_table
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: posts_table posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_table
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users_table(id);


--
-- Name: users_table users_posts_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_table
    ADD CONSTRAINT users_posts_fkey FOREIGN KEY (posts) REFERENCES public.posts_table(id);


--
-- PostgreSQL database dump complete
--

