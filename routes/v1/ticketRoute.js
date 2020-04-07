const express = require('express');
const ticketController = require('../../app/controllers/ticketController');
const router = express.Router();

router.route('/')
  .get((request, response) => {
    response.json({
      status: 'API is Working',
      message: 'Welcome to bus ticket booking',
    });
  });

router.route('/tickets')
  .post(ticketController.newTicket)
  .delete(ticketController.resetAll);

router.route('/ticket')
  .get(ticketController.view)
  .patch(ticketController.updateBookingStatus);

router.route('/tickets/open')
  .get(ticketController.showAllOpen);

router.route('/tickets/closed')
  .get(ticketController.showAllClosed);

router.route('/user')
  .get(ticketController.getUser);

router.route('/reset')
  .delete(ticketController.destroyAll);

module.exports = router;
