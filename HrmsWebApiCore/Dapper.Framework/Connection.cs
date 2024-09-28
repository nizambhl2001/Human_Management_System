using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading;

namespace Dapper.Framework
{
    public class Connection
    {
        private static string _connectionString;

        public static event EventHandler Disconnected;
        public static event EventHandler Connected;
        public static void Initialize(ConnectionString connectionString)
        {
            if (connectionString.IntegratedSecurity == "true")
            {
                _connectionString = $"Server={connectionString.Server};Database={connectionString.Database};Integrated Security={connectionString.IntegratedSecurity};";
            }
            else
            {
                _connectionString = $"Server={connectionString.Server};Database={connectionString.Database};Integrated Security={connectionString.IntegratedSecurity}; User ID={connectionString.UserId};Password={connectionString.Password};";
            }
        }

        private static void OnDisconnected()
        {
            if (Disconnected != null)
                Disconnected.Invoke(null, new EventArgs());
        }

        private static void OnConnected()
        {
            if (Connected != null)
                Connected.Invoke(null, new EventArgs());
        }

        public static string ConnectionString()
        {
            return _connectionString;
        }

        public static bool CheckConnection()
        {
            return Success();
        }
        private static bool Success()
        {
            var sw = new Stopwatch();
            var connectSuccess = false;

            var t = new Thread(delegate ()
            {
                try
                {
                    sw.Start();
                    using (var conn = new SqlConnection(_connectionString))
                    {
                        conn.Open();
                    }

                    connectSuccess = true;
                }
                catch
                {
                    connectSuccess = false;
                }
            });

            t.IsBackground = true;
            t.Start();

            while (2000 > sw.ElapsedMilliseconds)
                if (t.Join(1))
                    break;
            if (!connectSuccess)
                OnDisconnected();
            else
            {
                OnConnected();
            }

            return connectSuccess;
        }

        public static List<T> Get<T>(string table)
        {
            if (!Success()) return null;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var sql = string.Format("SELECT * FROM [{0}]", table);
                return conn.Query<T>(sql).ToList();
            }
        }

        public static List<T> Get<T>(string table, object param)
        {
            if (!Success()) return null;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var sql = string.Format("SELECT * FROM [{0}]", table);
                return conn.Query<T>(sql, param).ToList();
            }
        }

        public static List<T> ExecuteReader<T>(string storeProcedure)
        {
            if (!Success()) return null;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return conn.Query<T>(storeProcedure, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public static List<T> ExecuteReader<T>(string storeProcedure, object param)
        {
            if (!Success()) return null;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return conn.Query<T>(storeProcedure, param, commandType: CommandType.StoredProcedure).ToList();
            }
        }

        public static DataTable Get(string table)
        {
            if (!Success()) return null;
            var dataT = new DataTable();
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var sql = string.Format("SELECT * FROM [{0}]", table);
                var dr = conn.ExecuteReader(sql);
                dataT.Load(dr);
            }

            return dataT;
        }

        public static DataTable Get(string table, object param)
        {
            if (!Success()) return null;
            var dataT = new DataTable();
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var sql = string.Format("SELECT * FROM [{0}]", table);
                var dr = conn.ExecuteReader(sql, param);
                dataT.Load(dr);
            }

            return dataT;
        }

        public static DataTable ExecuteReader(string storeProcedure)
        {
            if (!Success()) return null;
            var dataT = new DataTable();
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var dr = conn.ExecuteReader(storeProcedure, commandType: CommandType.StoredProcedure);
                dataT.Load(dr);
            }

            return dataT;
        }

        public static DataTable ExecuteReader(string storeProcedure, object param)
        {
            if (!Success()) return null;
            var dataT = new DataTable();
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var dr = conn.ExecuteReader(storeProcedure, param, commandType: CommandType.StoredProcedure);
                dataT.Load(dr);
            }

            return dataT;
        }

        public static bool Execute(string storedProcedure)
        {
            if (!Success()) return false;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                try
                {
                    conn.Execute(storedProcedure, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public static bool Execute(string storedProcedure, object param)
        {
            if (!Success()) return false;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                try
                {
                    conn.Execute(storedProcedure, param, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public static bool ExecuteSql(string sql)
        {
            if (!Success()) return false;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                try
                {
                    conn.Execute(sql);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public static bool ExecuteSql(string sql, object param)
        {
            if (!Success()) return false;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                try
                {
                    conn.Execute(sql, param);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public static List<T> GetQuery<T>(string sql)
        {
            if (!Success()) return null;
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                return conn.Query<T>(sql).ToList();
            }

        }

        public static DataTable GetQuery(string sql)
        {
            if (!Success()) return null;
            var dataT = new DataTable();
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var dr = conn.ExecuteReader(sql);
                dataT.Load(dr);
            }

            return dataT;
        }
    }
}
