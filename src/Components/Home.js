import "../styles/home.css"
import "../styles/bootstrap.css"
import 'https://code.jquery.com/jquery-3.4.1.min.js';




const Home = () => {

  return (
    <div>
      <div className="hero_area">
        <section className="slider_section position-relative">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="col-lg-10 col-md-11 mx-auto">
                    <div className="detail-box">
                      <div>

                        <h1>
                          Stock Scape
                        </h1>
                        <p>
                          Introducing Stock Scape – your all-in-one solution for navigating the dynamic world of stocks. Stay ahead with real-time data from Nasdaq, create personalized watchlists, and make informed decisions with sentiment analysis. Dive into market insights and breaking news, empowering your stock investments like never before.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="col-lg-10 col-md-11 mx-auto">
                    <div className="detail-box">
                      <div>
                        <h2>
                          Watchlist
                        </h2>
                        <p>
                          Cultivate your investment strategy with Stock Scape's intuitive watchlist feature. Tailor your portfolio by adding and tracking specific stocks, ensuring you never miss a beat in the market. Stay informed about price changes, trends, and breaking news related to your selected stocks, enabling you to make timely and well-informed decisions that align with your financial goals.
                        </p>
                        <div className="">
                          <a href="/watch">
                            ADD NOW
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="col-lg-10 col-md-11 mx-auto">
                    <div className="detail-box">
                      <div>
                        <h2>
                          Insight Stream
                        </h2>
                        <p>
                          StockScape employs advanced sentiment analysis algorithms to decode market sentiments, providing you with real-time insights into investor emotions surrounding specific stocks. Our dynamic news page curates the latest and most relevant news articles, expert analyses, and social media trends related to the stock market. Stay ahead of the curve, understanding market sentiment shifts and staying informed about crucial events that impact your investment choices.
                        </p>
                        <div className="">
                          <a href="/news">
                            READ NOW
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
          </div>
        </section>
      </div>

      <section className="us_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Why Choose Us</h2>
          </div>
          <div className="us_container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-1.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>FREE ANALYSIS</h5>
                    <p>Enjoy a free, user-friendly platform. No fees, no limitations. Start investing and tracking stocks effortlessly.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-4.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>EDUCATIONAL HUB</h5>
                    <p>Access a diverse range of resources, from beginner guides to advanced trading strategies, empowering your investment journey.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-2.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>CONTINUOUS INNOVATION</h5>
                    <p>Stay ahead with our cutting-edge tools and strategic advancements, empowering your decisions in the dynamic stock market.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-3.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>CONTINUOUS UPGRADATION</h5>
                    <p>We are dedicated to enhancing your experience by consistently upgrading our services, ensuring your satisfaction and efficiency.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="heathy_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <div className="detail-box">
                <h2>Diversify Your Wisdom, Multiply Your Wealth!</h2>
                <p>
                  Empower your investment journey with a wealth of knowledge from various sources. Access expert insights, educational materials, and market analyses to make informed stock decisions.
                </p>
                <div className="btn-box">
                  <a href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer">
                    READ MORE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trainer_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2 style={{ color: "black" }}>About us</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 mx-auto">
              <div className="box">
                <div className="name">
                  <h5>Vishav Garg</h5>
                </div>
                <div className="social_box">
                  <a href="">
                    {/* <img src="images/facebook-logo.png" alt="" /> */}
                    <div className="git"></div>
                  </a>
                  <a href="">
                    {/* <img src="images/twitter.png" alt="" /> */}
                    <div className="link"></div>
                  </a>

                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mx-auto">
              <div className="box">
                <div className="name">
                  <h5>Sanidhya Sharma</h5>
                </div>
                <div className="social_box">
                  <a href="">
                    {/* <img src="images/facebook-logo.png" alt="" /> */}
                    <div className="git"></div>
                  </a>
                  <a href="">
                    {/* <img src="images/twitter.png" alt="" /> */}
                    <div className="link"></div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mx-auto">
              <div className="box">
                <div className="name">
                  <h5>Ishaan Sharma</h5>
                </div>
                <div className="social_box">
                  <a href="">
                    <div className="git"></div>
                  </a>
                  <a href="">
                    <div className="link"></div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_section ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 px-0 ">
              <div className="img-box">
                <div></div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="form_container pr-0 pr-lg-5 mr-0 mr-lg-2">
                <div className="heading_container">
                  <h2>Contact Us</h2>
                </div>
                <form action="">
                  <div>
                    <input type="text" placeholder="Name" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <input type="text" placeholder="Phone Number" />
                  </div>
                  <div>
                    <input type="text" className="message-box" placeholder="Message" />
                  </div>
                  <div className="d-flex">
                    <button>Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
