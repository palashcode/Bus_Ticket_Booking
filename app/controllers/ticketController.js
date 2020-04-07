const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

exports.newTicket = (req, res) => {
  const ticket = new Ticket({ seat_number: req.body.seat_number });
  const user = new User({ phone: req.body.traveller.phone });
  user.name = req.body.traveller.name;

  user.save()
    .then (data1 => {
      if (data1) {
        ticket.traveller = user._id;
        if(req.body.booking_status) ticket.booking_status = req.body.booking_status;
        ticket.save()
          .then( data2 => res.status(200).json({message:'New Ticket Created', data: data2 }))
          .catch( err => {
            User.findOneAndDelete({ _id: user._id })
              .then((data3) => res.status(400).json({ message: err, user:data3 }))
              .catch(err2 => res.status(400).json({ message: err2 }));
          });
      }
    })
    .catch(err3 => res.status(404).json({ message: err3 }));
};

exports.updateBookingStatus = (req, res) => {
  Ticket.findById(req.query.ticket_id, (err, ticket) => {
    if (err) res.status(404).json({ message: err });
    if (ticket) {
      if(req.body.booking_status) ticket.booking_status = req.body.booking_status;
      if (req.body.traveller) {
        User.findById(ticket.traveller,(err2,user) => {
          if (req.body.traveller.name) user.name = req.body.traveller.name;
          if (req.body.traveller.phone) user.phone = req.body.traveller.phone;
          user.save()
            .then(data2 => {
              ticket.save()
                .then(data => res.status(200).json({ ticket: data, traveller: data2 }))
                .catch(err1 => res.status(404).json(err1));
            }).catch(err3 => res.status(404).json(err3));
        });
      }
      else {
        ticket.save()
                .then(data => res.status(200).json({ ticket: data}))
                .catch(err1 => res.status(404).json(err1));
      }
    }
  });
};

exports.getUser = (req, res) => {
  Ticket.findById(req.query.ticket_id, (err1, ticket) => {
    if (err1) res.status(404).json({ message: err1 });
    else {
      User.findById(ticket.traveller, (err2, user) => {
        if (err2) res.status(404).json({ message: err2 });
        else res.status(200).json({ message: 'user found', traveller: user });
      });
    }
  });
};

exports.view = (req, res) => {
  Ticket.findById(req.query.ticket_id, (err, ticket) => {
    if (err) res.send(err);
    else {
      User.findById(ticket.traveller, (err2, user) => {
        if (err2) res.status(404).json({ message: err2 });
        else {
          res.status(200).json({ 
            message: `Ticket is ${ticket.booking_status}`,
            ticket:ticket,
            traveller:user
          });
        }
      });
    }
  });
};

exports.showAllOpen = (req, res) => {
  Ticket.find({booking_status:"notBooked"}, (err, tickets) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Tickets retrieved successfully',
      data: tickets
    });
  });
};

exports.showAllClosed = (req, res) => {
  Ticket.find({booking_status:"Booked"}, (err, tickets) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Tickets retrieved successfully',
      data: tickets
    });
  });
};

exports.destroyAll = (req,res) =>{
  console.log("destruction ahead!!");
  Ticket.remove({}, (err, data) => {
    if (err) res.status(404).json({ message: err });
    if (data) {
      User.remove({}, (err, data) => {
        if (err) res.status(404).json({ message: err });
        if (data) res.status(200).json({ message:"all users and tickets deleted." });
      });
    }
  });
};

exports.resetAll = (req,res)=>{
  Ticket.find({}, (err, data) => {
    if (err) res.status(404).json({ message: err });
    if (data) {
      data.forEach(
        (ticket) => {
          ticket.booking_status = "notBooked";
          ticket.save()
            .then(data => console.log(`Opened ticket with ticketID: ${ticket._id}`))
            .catch(err => console.log(`Failed to open ticket with ticketID: ${ticket._id}`));
        });
      res.status(200).json({ message: "success" });
    }
  });
};
