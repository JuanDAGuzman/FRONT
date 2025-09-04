import React, { useEffect, useState } from "react";
import PatientNavbar from "../../../components/NavBar/PatientNavbar.tsx";
import Footer from "../../../components/Footer/Footer";
import ProfilePatient from "./ProfilePatient";
import NewsSection, { NewsItem } from "./NewsSection";

const Profile_Patient: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(() => setNews([]))
      .finally(() => setLoadingNews(false));
  }, []);

  if (!user?.id) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PatientNavbar user={user} />
      <main className="container mx-auto px-4 py-8 flex-1 pt-24">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-center min-h-[60vh]">
          <div className="md:w-2/4 order-2 md:order-1">
            {loadingNews ? (
              <div className="text-gray-400 py-16 text-center">
                Cargando noticias...
              </div>
            ) : (
              <NewsSection news={news} />
            )}
          </div>
          <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
            <ProfilePatient userId={user.id} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile_Patient;
