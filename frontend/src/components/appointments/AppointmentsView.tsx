import React, { useState } from 'react';
import './Appointments.css';

interface Appointment {
    id: number;
    customerName: string;
    service: string;
    staff: string;
    date: string;
    time: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
}

const AppointmentsView: React.FC = () => {
    // Mock appointments data
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: 1, customerName: 'Alice Johnson', service: 'Hair Cut', staff: 'John D.', date: '2026-03-12', time: '10:00 AM', status: 'Completed' },
        { id: 2, customerName: 'Bob Smith', service: 'Beard Trim', staff: 'Mike T.', date: '2026-03-12', time: '11:30 AM', status: 'Upcoming' },
        { id: 3, customerName: 'Emma Davis', service: 'Hair Coloring', staff: 'Sarah W.', date: '2026-03-12', time: '1:00 PM', status: 'Upcoming' },
        { id: 4, customerName: 'Chris Lee', service: 'Facial', staff: 'Lisa M.', date: '2026-03-13', time: '10:00 AM', status: 'Upcoming' },
        { id: 5, customerName: 'David Kim', service: 'Hair Wash', staff: 'John D.', date: '2026-03-13', time: '2:00 PM', status: 'Upcoming' },
    ]);

    const [viewMode, setViewMode] = useState<'Daily' | 'Weekly'>('Daily');
    const [selectedDate, setSelectedDate] = useState('2026-03-12'); // Mock today's date

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApt, setEditingApt] = useState<Appointment | null>(null);

    // Filter based on selected date
    const filteredAppointments = appointments.filter(apt => apt.date === selectedDate);

    // Sort by time (naive sort for mock data)
    filteredAppointments.sort((a, b) => {
        // A simple hacky sort for "HH:MM AM/PM" just for demonstration
        const timeA = new Date(`1970/01/01 ${a.time}`);
        const timeB = new Date(`1970/01/01 ${b.time}`);
        return timeA.getTime() - timeB.getTime();
    });

    const handleBookNew = () => {
        setEditingApt(null);
        setIsModalOpen(true);
    };

    const handleReschedule = (apt: Appointment) => {
        setEditingApt(apt);
        setIsModalOpen(true);
    };

    const handleCancel = (id: number) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
        }
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newApt: Appointment = {
            id: editingApt ? editingApt.id : appointments.length + 1,
            customerName: formData.get('customerName') as string,
            service: formData.get('service') as string,
            staff: formData.get('staff') as string,
            date: formData.get('date') as string,
            time: formData.get('time') as string,
            status: formData.get('status') as any || 'Upcoming',
        };

        if (editingApt) {
            setAppointments(appointments.map(a => a.id === editingApt.id ? newApt : a));
        } else {
            setAppointments([...appointments, newApt]);
        }

        setIsModalOpen(false);
    };

    // Mock time slots for the daily view
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

    return (
        <div className="module-container animate-fade-in">
            <div className="module-header">
                <div>
                    <h1>Appointment Booking</h1>
                    <p className="subtitle">Manage your salon's schedule effectively.</p>
                </div>
                <button className="btn-primary" onClick={handleBookNew}>
                    <span className="icon">➕</span> Book Appointment
                </button>
            </div>

            <div className="schedule-controls glass-panel">
                <div className="view-toggles">
                    <button
                        className={`toggle-btn ${viewMode === 'Daily' ? 'active' : ''}`}
                        onClick={() => setViewMode('Daily')}
                    >
                        Daily
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'Weekly' ? 'active' : ''}`}
                        onClick={() => setViewMode('Weekly')}
                    >
                        Weekly
                    </button>
                </div>

                <div className="date-selector">
                    <button className="icon-btn-sm">◀</button>
                    <input
                        type="date"
                        className="input-field date-input"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button className="icon-btn-sm">▶</button>
                </div>

                <div className="staff-filter">
                    <select className="input-field select-field">
                        <option value="all">All Staff</option>
                        <option value="John D.">John D.</option>
                        <option value="Mike T.">Mike T.</option>
                        <option value="Sarah W.">Sarah W.</option>
                        <option value="Lisa M.">Lisa M.</option>
                    </select>
                </div>
            </div>

            <div className="schedule-view glass-panel">
                {viewMode === 'Daily' ? (
                    <div className="daily-calendar">
                        <div className="time-col">
                            {timeSlots.map((time, idx) => (
                                <div key={idx} className="time-slot-label">{time}</div>
                            ))}
                        </div>
                        <div className="appointments-col">
                            {filteredAppointments.length > 0 ? (
                                <div className="appointments-list">
                                    {filteredAppointments.map(apt => (
                                        <div className={`appointment-card status-${apt.status.toLowerCase()}`} key={apt.id}>
                                            <div className="apt-time">{apt.time}</div>
                                            <div className="apt-details">
                                                <h4>{apt.customerName}</h4>
                                                <p>{apt.service} • {apt.staff}</p>
                                            </div>
                                            <div className="apt-actions">
                                                {apt.status === 'Upcoming' && (
                                                    <>
                                                        <button className="btn-secondary btn-sm" onClick={() => handleReschedule(apt)}>Reschedule</button>
                                                        <button className="btn-danger btn-sm" onClick={() => handleCancel(apt.id)}>Cancel</button>
                                                    </>
                                                )}
                                                <span className={`badge badge-${apt.status === 'Completed' ? 'success' : apt.status === 'Cancelled' ? 'danger' : 'warning'}`}>
                                                    {apt.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-schedule">
                                    <p>No appointments scheduled for this date.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="weekly-calendar">
                        {/* Placeholder for weekly view */}
                        <div className="empty-schedule">
                            <p>Weekly view coming soon. Switch to Daily to see appointments.</p>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay animate-fade-in" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingApt ? 'Reschedule Appointment' : 'Book New Appointment'}</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
                        </div>

                        <form onSubmit={handleSave} className="modal-form">
                            <div className="form-group">
                                <label>Customer Name</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    className="input-field"
                                    defaultValue={editingApt?.customerName || ''}
                                    required
                                    placeholder="Select or enter customer..."
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Service</label>
                                    <select name="service" className="input-field select-field" defaultValue={editingApt?.service || 'Hair Cut'}>
                                        <option value="Hair Cut">Hair Cut</option>
                                        <option value="Hair Coloring">Hair Coloring</option>
                                        <option value="Facial">Facial</option>
                                        <option value="Beard Trim">Beard Trim</option>
                                        <option value="Hair Wash">Hair Wash</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Staff Member</label>
                                    <select name="staff" className="input-field select-field" defaultValue={editingApt?.staff || 'John D.'}>
                                        <option value="John D.">John D. (Hair stylist)</option>
                                        <option value="Mike T.">Mike T. (Barber)</option>
                                        <option value="Sarah W.">Sarah W. (Hair stylist)</option>
                                        <option value="Lisa M.">Lisa M. (Beautician)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="input-field"
                                        defaultValue={editingApt?.date || selectedDate}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time</label>
                                    <select name="time" className="input-field select-field" defaultValue={editingApt?.time || '10:00 AM'}>
                                        <option value="09:00 AM">09:00 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="01:00 PM">01:00 PM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                        <option value="05:00 PM">05:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            {editingApt && (
                                <div className="form-group">
                                    <label>Status</label>
                                    <select name="status" className="input-field select-field" defaultValue={editingApt.status}>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            )}

                            {/* Optional Reminder toggle */}
                            <div className="form-group check-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                                <input type="checkbox" id="sendReminder" defaultChecked />
                                <label htmlFor="sendReminder" style={{ fontWeight: 'normal' }}>Send SMS / Email reminder to customer</label>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">
                                    {editingApt ? 'Save Changes' : 'Confirm Booking'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsView;
