import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
  // name: { type: String, required: true },
  // bus_number: { type: Number, default: Bus.bus_number },
  seat_number: {
    type: Number, min: 1, max: 40, required: true, unique: true
  },
  booking_status: { type: String, default: 'notBooked' },
  create_date: { type: Date, default: Date.now },
  traveller: { type: mongoose.Schema.Types.ObjectId, reference: 'userModel' }
});

const Ticket = module.exports = mongoose.model('ticket', ticketSchema);
module.exports.get = function (callback, limit) {
  Ticket.find(callback).limit(limit);
}