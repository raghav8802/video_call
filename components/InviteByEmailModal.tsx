import { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface InviteByEmailModalProps {
  open: boolean;
  onClose: () => void;
  meetingLink: string;
}

const InviteByEmailModal = ({ open, onClose, meetingLink }: InviteByEmailModalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!email) {
      toast({ title: 'Please enter an email address' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, meetingLink }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Invite sent!' });
        setEmail('');
        onClose();
      } else {
        toast({ title: data.error || 'Failed to send invite' });
      }
    } catch (err) {
      toast({ title: 'Failed to send invite' });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-dark-1 p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">Invite by Email</h2>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded bg-dark-3 p-2 text-white focus:outline-none"
        />
        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} variant="secondary" disabled={loading}>Cancel</Button>
          <Button onClick={handleSend} disabled={loading} className="bg-blue-1">
            {loading ? 'Sending...' : 'Send Invite'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteByEmailModal; 