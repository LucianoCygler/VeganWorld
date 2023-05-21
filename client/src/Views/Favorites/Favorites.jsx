import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
	deleteFavoriteAction,
	getClientAllFavorites,
	getUserDataByEmail,
} from "../../redux/actions/actions";
import styles from "./Favorites.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Image, Modal } from "react-bootstrap";
import LoginForm from "../Login/LoginForm";
import { Box } from "@chakra-ui/react";
import "./Favorites.css";

import { Wrap, WrapItem } from "@chakra-ui/react";
import CardFav from "./CardFav";

const Favorites = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {favorites, deleteFavorite, user, isAuthenticated} = useSelector((state) => state);

	const [isFav, setIsFav] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const email = localStorage.getItem("email");
	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleShowModal = () => {
		setShowModal(true);
	};
	const handleFavorite = (productId) => {
		setIsFav(false);
		dispatch(deleteFavoriteAction(productId));
	};
  
	useEffect(() => {
		if (email) {
			dispatch(getUserDataByEmail(email));
		}
	}, [email]);

	useEffect(() => {
		if (user) {
			const client_id = user?.id;
			dispatch(getClientAllFavorites(client_id));
		}
	}, [user, deleteFavorite]);

	return (
		<>
			<div>
				<Modal show={showModal} onHide={handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Sign in</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<LoginForm handleCloseModal={handleCloseModal} />{" "}
					</Modal.Body>
				</Modal>
				{!user ? (
					<div className={styles.divLogin}>
						<h2>
							Hey, I see that you are trying to access your Favorites, but to do
							so, you must first be logged in.
						</h2>
						<Button variant="primary" onClick={handleShowModal}>
							Click here to log in!{" "}
						</Button>
					</div>
				) : (
					<Box mt={110}>
						<h1 className={styles.h1}>These are your favorite products ♥</h1>
						<Wrap py={5} spacing={"5"} justify={"center"}>
							{favorites && favorites.length > 0 ? (
								favorites?.map((product, index) => {
									return (
										<WrapItem shadow={"dark-lg"}>
											<CardFav product={product} favorites={favorites} />
										</WrapItem>
									);
								})
							) : (
								<h1 className={styles.nofavs}>You don't have favorites</h1>
							)}
						</Wrap>
					</Box>
				)}
			</div>
		</>
	);

};

export default Favorites;
