{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      " * Serving Flask app \"__main__\" (lazy loading)\n",
      " * Environment: production\n",
      "   WARNING: This is a development server. Do not use it in a production deployment.\n",
      "   Use a production WSGI server instead.\n",
      " * Debug mode: on\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      " * Restarting with stat\n"
     ]
    },
    {
     "ename": "SystemExit",
     "evalue": "1",
     "output_type": "error",
     "traceback": [
      "An exception has occurred, use %tb to see the full traceback.\n",
      "\u001b[1;31mSystemExit\u001b[0m\u001b[1;31m:\u001b[0m 1\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "C:\\Users\\Michael\\Anaconda3\\lib\\site-packages\\IPython\\core\\interactiveshell.py:3334: UserWarning: To exit: use 'exit', 'quit', or Ctrl-D.\n",
      "  warn(\"To exit: use 'exit', 'quit', or Ctrl-D.\", stacklevel=1)\n"
     ]
    }
   ],
   "source": [
    "import numpy as np\n",
    "import sqlalchemy\n",
    "from sqlalchemy.ext.automap import automap_base\n",
    "from sqlalchemy.orm import Session\n",
    "from sqlalchemy import create_engine, func\n",
    "from flask import Flask, jsonify\n",
    "\n",
    "#################################################\n",
    "# Database Setup\n",
    "#################################################\n",
    "engine = create_engine(\"sqlite:///project2.sqlite\")\n",
    "\n",
    "# reflect an existing database into a new model\n",
    "Base = automap_base()\n",
    "# reflect the tables\n",
    "Base.prepare(engine, reflect=True)\n",
    "\n",
    "# Save reference to the table\n",
    "CountyUnemployment = Base.classes.CountyUnemployment\n",
    "\n",
    "#################################################\n",
    "# Flask Setup\n",
    "#################################################\n",
    "app = Flask(__name__)\n",
    "\n",
    "#################################################\n",
    "# Flask Routes\n",
    "#################################################\n",
    "\n",
    "@app.route(\"/\")\n",
    "def welcome():\n",
    "    \"\"\"List all available api routes.\"\"\"\n",
    "    return (\n",
    "        f\"Available Routes:<br/>\"\n",
    "        f\"/api/v1.0/names<br/>\"\n",
    "        f\"/api/v1.0/passengers\"\n",
    "    )\n",
    "\n",
    "\n",
    "@app.route(\"/api/v1.0/names\")\n",
    "def names():\n",
    "    # Create our session (link) from Python to the DB\n",
    "    session = Session(engine)\n",
    "\n",
    "    \"\"\"Return a list of all passenger names\"\"\"\n",
    "    # Query all passengers\n",
    "    results = session.query(CountyUnemployment.Unemployment_Rate).all()\n",
    "\n",
    "    session.close()\n",
    "\n",
    "    # Convert list of tuples into normal list\n",
    "    all_names = list(np.ravel(results))\n",
    "\n",
    "    return jsonify(all_names)\n",
    "\n",
    "\"\"\"\n",
    "@app.route(\"/api/v1.0/passengers\")\n",
    "def passengers():\n",
    "    # Create our session (link) from Python to the DB\n",
    "    session = Session(engine)\n",
    "\n",
    "    \"\"\" \"\"\"Return a list of passenger data including the name, age, and sex of each passenger\"\"\" \"\"\" \n",
    "    # Query all passengers\n",
    "    results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()\n",
    "\n",
    "    session.close()\n",
    "\n",
    "    # Create a dictionary from the row data and append to a list of all_passengers\n",
    "    all_passengers = []\n",
    "    for name, age, sex in results:\n",
    "        passenger_dict = {}\n",
    "        passenger_dict[\"name\"] = name\n",
    "        passenger_dict[\"age\"] = age\n",
    "        passenger_dict[\"sex\"] = sex\n",
    "        all_passengers.append(passenger_dict)\n",
    "\n",
    "    return jsonify(all_passengers)\n",
    "\"\"\"\n",
    "\n",
    "if __name__ == '__main__':\n",
    "    app.run(debug=True)\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
