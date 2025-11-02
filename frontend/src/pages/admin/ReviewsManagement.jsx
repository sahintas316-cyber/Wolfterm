import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { adminApi } from '../../services/adminApi';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { Trash2, Star } from 'lucide-react';

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await api.getReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Yorumlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yorumu silmek istediğinizden emin misiniz?')) return;

    try {
      await adminApi.deleteReview(id);
      setReviews(reviews.filter(r => r.id !== id));
      toast.success('Yorum silindi');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Yorum silinemedi');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Yorum Yönetimi</h1>
        <p className="text-gray-600">Toplam {reviews.length} yorum</p>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{review.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{review.city}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(review.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <Badge variant="secondary">{review.rating}/5</Badge>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsManagement;